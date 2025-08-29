# Vibe Kanban UI Kit

A reusable UI component library extracted from Vibe Kanban, built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design System** - Clean, accessible components with consistent styling
- 🌙 **Theme Support** - Built-in light/dark mode with custom theme variants
- 🎯 **TypeScript** - Full TypeScript support with comprehensive type definitions
- 🎪 **Tailwind CSS** - Utility-first styling with CSS custom properties
- 📱 **Responsive** - Mobile-first responsive design
- ♿ **Accessible** - Built with accessibility in mind using Radix UI primitives
- 🔧 **Customizable** - Easy to customize and extend

## Installation

```bash
npm install @vibe-kanban/ui-kit
# or
yarn add @vibe-kanban/ui-kit
# or
pnpm add @vibe-kanban/ui-kit
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom tailwindcss
```

## Setup

### 1. Import Styles

Import the UI Kit styles in your main CSS file or entry point:

```css
@import '@vibe-kanban/ui-kit/styles';
```

### 2. Configure Tailwind CSS

Add the UI Kit to your `tailwind.config.js`:

```js
import uiKitConfig from '@vibe-kanban/ui-kit/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...uiKitConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@vibe-kanban/ui-kit/dist/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  // Merge any custom configuration
  theme: {
    ...uiKitConfig.theme,
    extend: {
      ...uiKitConfig.theme.extend,
      // Your custom theme extensions
    },
  },
};
```

### 3. Wrap with Theme Provider

Wrap your app with the ThemeProvider for theme support:

```tsx
import { ThemeProvider } from '@vibe-kanban/ui-kit';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Usage

### Basic Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@vibe-kanban/ui-kit';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Form Components

```tsx
import { 
  Input, 
  Label, 
  Textarea, 
  Checkbox, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@vibe-kanban/ui-kit';

function MyForm() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message..." />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={checked} 
          onCheckedChange={setChecked} 
        />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
      
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### Advanced Components

```tsx
import { 
  JSONEditor, 
  MarkdownRenderer, 
  ImageUploadSection,
  FileSearchTextarea,
  KanbanProvider,
  KanbanBoard,
  KanbanCard 
} from '@vibe-kanban/ui-kit';

function AdvancedExample() {
  const [jsonValue, setJsonValue] = useState('{}');
  const [images, setImages] = useState([]);
  
  const handleImageUpload = async (file) => {
    // Your upload logic
    return { id: '1', originalName: file.name, sizeBytes: file.size };
  };
  
  return (
    <div className="space-y-6">
      <JSONEditor 
        value={jsonValue} 
        onChange={setJsonValue}
        placeholder="Enter JSON..."
      />
      
      <MarkdownRenderer content="# Hello **World**" />
      
      <ImageUploadSection
        images={images}
        onImagesChange={setImages}
        onUpload={handleImageUpload}
      />
      
      <FileSearchTextarea
        value=""
        onChange={() => {}}
        placeholder="Type @ to search files..."
        onFileSearch={async (query) => []}
      />
    </div>
  );
}
```

### Theme Usage

```tsx
import { useTheme, ThemeMode } from '@vibe-kanban/ui-kit';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button 
      onClick={() => 
        setTheme(theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)
      }
    >
      Toggle Theme
    </button>
  );
}
```

## Available Components

### Basic Components
- `Alert`, `AlertTitle`, `AlertDescription`
- `Badge`
- `Button`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Loader`

### Form Components
- `Input`
- `Label`
- `Textarea`
- `AutoExpandingTextarea`
- `Checkbox`
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue`

### Navigation & Layout
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuTrigger`
- `Tooltip`, `TooltipContent`, `TooltipTrigger`, `TooltipProvider`

### Advanced Components
- `JSONEditor` - Code editor with JSON validation
- `MarkdownRenderer` - Render markdown content
- `ImageUploadSection` - Drag & drop image upload
- `FileSearchTextarea` - Textarea with file search (@ trigger)
- `MultiFileSearchTextarea` - Multi-file search and selection
- `FolderPicker` - Directory browser dialog
- `KanbanProvider`, `KanbanBoard`, `KanbanCard`, `KanbanHeader`, `KanbanCards` - Drag & drop kanban

### Theme
- `ThemeProvider` - Theme context provider
- `useTheme` - Theme hook
- `ThemeMode` - Theme mode enum

## Component Props

### FileSearchTextarea
```tsx
interface FileSearchTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFileSearch?: (query: string) => Promise<{ path: string; name: string; isFile: boolean }[]>;
  // ... other props
}
```

### ImageUploadSection
```tsx
interface ImageUploadSectionProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  onUpload: (file: File) => Promise<ImageFile>;
  onDelete?: (imageId: string) => Promise<void>;
  // ... other props
}

interface ImageFile {
  id: string;
  originalName: string;
  sizeBytes: bigint | number;
  url?: string;
}
```

### FolderPicker
```tsx
interface FolderPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  onListDirectory?: (path?: string) => Promise<DirectoryListResponse>;
  // ... other props
}
```

## Theming

The UI Kit supports multiple theme modes:

- `ThemeMode.LIGHT` - Light theme
- `ThemeMode.DARK` - Dark theme  
- `ThemeMode.SYSTEM` - Follow system preference
- `ThemeMode.PURPLE` - Purple accent theme
- `ThemeMode.GREEN` - Green accent theme
- `ThemeMode.BLUE` - Blue accent theme
- `ThemeMode.ORANGE` - Orange accent theme
- `ThemeMode.RED` - Red accent theme

### Custom Themes

You can extend the theme by modifying CSS custom properties:

```css
:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 142.1 76.2% 36.3%;
  /* ... other custom properties */
}
```

## Development

To run the example/gallery locally:

```bash
cd packages/ui-kit/example
npm install
npm run dev
```

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request