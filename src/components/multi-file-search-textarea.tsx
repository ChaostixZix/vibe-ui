import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AutoExpandingTextarea } from './auto-expanding-textarea';

interface FileSearchResult {
  path: string;
  name: string;
  isFile: boolean;
}

interface MultiFileSearchTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  onFileSearch?: (query: string) => Promise<FileSearchResult[]>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  maxRows?: number;
}

export function MultiFileSearchTextarea({
  value,
  onChange,
  placeholder = 'Start typing a file path...',
  rows = 3,
  disabled = false,
  className,
  onFileSearch,
  onKeyDown,
  maxRows = 10,
}: MultiFileSearchTextareaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FileSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentTokenStart, setCurrentTokenStart] = useState(-1);
  const [currentTokenEnd, setCurrentTokenEnd] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchCacheRef = useRef<Map<string, FileSearchResult[]>>(new Map());

  // Search for files when query changes
  useEffect(() => {
    if (!searchQuery || !onFileSearch || searchQuery.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    // Check cache first
    const cached = searchCacheRef.current.get(searchQuery);
    if (cached) {
      setSearchResults(cached);
      setShowDropdown(true);
      setSelectedIndex(-1);
      return;
    }

    const searchFiles = async () => {
      setIsLoading(true);

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const result = await onFileSearch(searchQuery);

        // Only process if this request wasn't aborted
        if (!abortController.signal.aborted) {
          // Cache the results
          searchCacheRef.current.set(searchQuery, result);
          
          setSearchResults(result);
          setShowDropdown(true);
          setSelectedIndex(-1);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Failed to search files:', error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(searchFiles, 350);
    return () => {
      clearTimeout(debounceTimer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery, onFileSearch]);

  // Find current token boundaries based on cursor position
  const findCurrentToken = (text: string, cursorPosition: number) => {
    const textBefore = text.slice(0, cursorPosition);
    const textAfter = text.slice(cursorPosition);

    // Find the last separator (comma or newline) before cursor
    const lastSeparatorIndex = Math.max(
      textBefore.lastIndexOf(','),
      textBefore.lastIndexOf('\n')
    );

    // Find the next separator after cursor
    const nextSeparatorIndex = Math.min(
      textAfter.indexOf(',') === -1
        ? Infinity
        : textAfter.indexOf(',') + cursorPosition,
      textAfter.indexOf('\n') === -1
        ? Infinity
        : textAfter.indexOf('\n') + cursorPosition
    );

    const tokenStart = lastSeparatorIndex + 1;
    const tokenEnd =
      nextSeparatorIndex === Infinity ? text.length : nextSeparatorIndex;
    const token = text.slice(tokenStart, tokenEnd).trim();

    return {
      token,
      start: tokenStart,
      end: tokenEnd,
    };
  };

  // Handle text changes and detect current token
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;

    onChange(newValue);

    const { token, start, end } = findCurrentToken(newValue, cursorPosition);

    setCurrentTokenStart(start);
    setCurrentTokenEnd(end);

    // Show search results if token has 2+ characters
    if (token.length >= 2) {
      setSearchQuery(token);
    } else {
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle dropdown navigation first
    if (showDropdown && searchResults.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          return;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          return;
        case 'Enter':
        case 'Tab':
          if (selectedIndex >= 0) {
            e.preventDefault();
            selectFile(searchResults[selectedIndex]);
            return;
          }
          break;
        case 'Escape':
          e.preventDefault();
          setShowDropdown(false);
          setSearchQuery('');
          return;
      }
    }

    // Call the passed onKeyDown handler
    onKeyDown?.(e);
  };

  // Select a file and insert it into the text
  const selectFile = (file: FileSearchResult) => {
    if (currentTokenStart === -1) return;

    const before = value.slice(0, currentTokenStart);
    const after = value.slice(currentTokenEnd);

    // Smart comma handling - add ", " if not at end and next char isn't comma/newline
    let insertion = file.path;
    const trimmedAfter = after.trimStart();
    const needsComma =
      trimmedAfter.length > 0 &&
      !trimmedAfter.startsWith(',') &&
      !trimmedAfter.startsWith('\n');

    if (needsComma || trimmedAfter.length === 0) {
      insertion += ', ';
    }

    const newValue =
      before.trimEnd() + (before.trimEnd() ? ' ' : '') + insertion + after;
    onChange(newValue);

    setShowDropdown(false);
    setSearchQuery('');

    // Focus back to textarea and position cursor after insertion
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos =
          currentTokenStart + (before.trimEnd() ? 1 : 0) + insertion.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (!textareaRef.current) return { top: 0, left: 0, maxHeight: 240 };

    const textareaRect = textareaRef.current.getBoundingClientRect();
    const dropdownWidth = 256;
    const maxDropdownHeight = 320;
    const minDropdownHeight = 120;

    let finalTop = textareaRect.bottom + 4;
    let finalLeft = textareaRect.left;
    let maxHeight = maxDropdownHeight;

    // Ensure dropdown doesn't go off the right edge
    if (finalLeft + dropdownWidth > window.innerWidth - 16) {
      finalLeft = window.innerWidth - dropdownWidth - 16;
    }

    // Ensure dropdown doesn't go off the left edge
    if (finalLeft < 16) {
      finalLeft = 16;
    }

    // Calculate available space below and above textarea
    const availableSpaceBelow = window.innerHeight - textareaRect.bottom - 32;
    const availableSpaceAbove = textareaRect.top - 32;

    // If not enough space below, position above
    if (
      availableSpaceBelow < minDropdownHeight &&
      availableSpaceAbove > availableSpaceBelow
    ) {
      const actualHeight =
        dropdownRef.current?.getBoundingClientRect().height ||
        minDropdownHeight;
      finalTop = textareaRect.top - actualHeight - 4;
      maxHeight = Math.min(
        maxDropdownHeight,
        Math.max(availableSpaceAbove, minDropdownHeight)
      );
    } else {
      maxHeight = Math.min(
        maxDropdownHeight,
        Math.max(availableSpaceBelow, minDropdownHeight)
      );
    }

    return { top: finalTop, left: finalLeft, maxHeight };
  };

  const dropdownPosition = getDropdownPosition();

  return (
    <div className={`relative ${className?.includes('flex-1') ? 'flex-1' : ''}`}>
      <AutoExpandingTextarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={className}
        maxRows={maxRows}
      />

      {showDropdown &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed bg-background border border-border rounded-none shadow-lg overflow-y-auto min-w-64"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              maxHeight: dropdownPosition.maxHeight,
              zIndex: 10000,
            }}
          >
            {isLoading ? (
              <div className="p-2 text-sm text-muted-foreground">Searching...</div>
            ) : searchResults.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">No files found</div>
            ) : (
              <div className="py-1">
                {searchResults.map((file, index) => (
                  <div
                    key={file.path}
                    className={`px-3 py-2 cursor-pointer text-sm ${
                      index === selectedIndex
                        ? 'bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => selectFile(file)}
                  >
                    <div className="font-medium truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{file.path}</div>
                  </div>
                ))}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
