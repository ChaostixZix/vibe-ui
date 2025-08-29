import { useState } from 'react';
import { 
  ThemeProvider, 
  ThemeMode, 
  useTheme,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Alert,
  AlertDescription,
  Badge,
  Checkbox,
  Input,
  Label,
  Textarea,
  AutoExpandingTextarea,
  Loader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  JSONEditor,
  MarkdownRenderer,
  ImageUploadSection,
  FileSearchTextarea,
  MultiFileSearchTextarea,
  FolderPicker,
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard
} from '@vibe-kanban/ui-kit';
import type { DragEndEvent, ImageFile, DirectoryListResponse } from '@vibe-kanban/ui-kit';
import { Sun, Moon, Settings, AlertCircle, Check } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
    >
      {theme === ThemeMode.DARK ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function ComponentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}

function AlertsSection() {
  return (
    <ComponentSection title="Alerts">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is a default alert with an informational message.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is a destructive alert indicating an error or warning.
        </AlertDescription>
      </Alert>
    </ComponentSection>
  );
}

function ButtonsSection() {
  return (
    <ComponentSection title="Buttons">
      <div className="flex gap-2 flex-wrap">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button disabled>Disabled</Button>
        <Loader size={16} />
      </div>
    </ComponentSection>
  );
}

function BadgesSection() {
  return (
    <ComponentSection title="Badges">
      <div className="flex gap-2 flex-wrap">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </ComponentSection>
  );
}

function FormSection() {
  const [checked, setChecked] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <ComponentSection title="Form Controls">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="input-demo">Input Field</Label>
          <Input 
            id="input-demo" 
            placeholder="Type something..." 
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="select-demo">Select Dropdown</Label>
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="textarea-demo">Regular Textarea</Label>
        <Textarea 
          id="textarea-demo"
          placeholder="Type your message..."
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="auto-textarea-demo">Auto-expanding Textarea</Label>
        <AutoExpandingTextarea 
          id="auto-textarea-demo"
          placeholder="This textarea grows as you type..."
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          maxRows={6}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="checkbox-demo"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="checkbox-demo">Accept terms and conditions</Label>
      </div>
    </ComponentSection>
  );
}

function InteractiveSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState('tab1');

  return (
    <ComponentSection title="Interactive Components">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Dropdown Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for Tab 1</TabsContent>
        <TabsContent value="tab2">Content for Tab 2</TabsContent>
        <TabsContent value="tab3">Content for Tab 3</TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Example Dialog</DialogTitle>
            <DialogDescription>
              This is an example dialog using the UI Kit components.
            </DialogDescription>
          </DialogHeader>
          <p>Dialog content goes here.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ComponentSection>
  );
}

function AdvancedSection() {
  const [jsonValue, setJsonValue] = useState('{\n  "example": "value",\n  "number": 42\n}');
  const [markdownValue] = useState(`# Markdown Example

This is **bold** and *italic* text.

- List item 1
- List item 2
- List item 3

\`inline code\` example.
`);

  const [images, setImages] = useState<ImageFile[]>([]);
  const [fileSearchValue, setFileSearchValue] = useState('');
  const [multiFileValue, setMultiFileValue] = useState('');
  const [folderPickerOpen, setFolderPickerOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');

  const handleImageUpload = async (file: File): Promise<ImageFile> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockImage: ImageFile = {
          id: Math.random().toString(),
          originalName: file.name,
          sizeBytes: file.size,
          url: URL.createObjectURL(file),
        };
        resolve(mockImage);
      }, 1000);
    });
  };

  const mockFileSearch = async (query: string) => {
    // Mock file search
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { path: `src/${query}.tsx`, name: `${query}.tsx`, isFile: true },
      { path: `components/${query}.tsx`, name: `${query}.tsx`, isFile: true },
    ];
  };

  const mockDirectoryList = async (path?: string): Promise<DirectoryListResponse> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      entries: [
        { name: 'src', path: '/src', isDirectory: true, isGitRepo: false },
        { name: 'components', path: '/components', isDirectory: true, isGitRepo: false },
        { name: 'package.json', path: '/package.json', isDirectory: false, isGitRepo: false },
      ],
      currentPath: path || '/home/user/project',
    };
  };

  return (
    <ComponentSection title="Advanced Components">
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">JSON Editor</h4>
          <JSONEditor
            value={jsonValue}
            onChange={setJsonValue}
            minHeight={150}
            placeholder="Enter JSON..."
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Markdown Renderer</h4>
          <Card>
            <CardContent className="pt-6">
              <MarkdownRenderer content={markdownValue} />
            </CardContent>
          </Card>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Image Upload</h4>
          <ImageUploadSection
            images={images}
            onImagesChange={setImages}
            onUpload={handleImageUpload}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">File Search Textarea</h4>
          <FileSearchTextarea
            value={fileSearchValue}
            onChange={setFileSearchValue}
            placeholder="Type @ to search for files..."
            onFileSearch={mockFileSearch}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Multi-file Search Textarea</h4>
          <MultiFileSearchTextarea
            value={multiFileValue}
            onChange={setMultiFileValue}
            placeholder="Type file paths, comma separated..."
            onFileSearch={mockFileSearch}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Folder Picker</h4>
          <div className="flex gap-2 items-center">
            <Input 
              value={selectedPath} 
              onChange={(e) => setSelectedPath(e.target.value)}
              placeholder="No folder selected"
              readOnly 
            />
            <Button onClick={() => setFolderPickerOpen(true)}>Browse</Button>
          </div>
          <FolderPicker
            open={folderPickerOpen}
            onClose={() => setFolderPickerOpen(false)}
            onSelect={(path) => {
              setSelectedPath(path);
              setFolderPickerOpen(false);
            }}
            onListDirectory={mockDirectoryList}
          />
        </div>
      </div>
    </ComponentSection>
  );
}

function KanbanSection() {
  const [kanbanData, setKanbanData] = useState({
    todo: [
      { id: '1', name: 'Task 1', startAt: new Date(), endAt: new Date(), status: { id: 'todo', name: 'To Do', color: '--blue-500' } },
      { id: '2', name: 'Task 2', startAt: new Date(), endAt: new Date(), status: { id: 'todo', name: 'To Do', color: '--blue-500' } },
    ],
    inprogress: [
      { id: '3', name: 'Task 3', startAt: new Date(), endAt: new Date(), status: { id: 'inprogress', name: 'In Progress', color: '--yellow-500' } },
    ],
    done: [
      { id: '4', name: 'Task 4', startAt: new Date(), endAt: new Date(), status: { id: 'done', name: 'Done', color: '--green-500' } },
    ],
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = active.data.current?.parent as string;
    const targetColumn = over.id as string;
    const taskId = active.id as string;

    if (sourceColumn !== targetColumn) {
      setKanbanData(prev => {
        const newData = { ...prev };
        const taskIndex = newData[sourceColumn as keyof typeof newData].findIndex(task => task.id === taskId);
        const task = newData[sourceColumn as keyof typeof newData][taskIndex];
        
        if (task) {
          // Remove from source
          newData[sourceColumn as keyof typeof newData].splice(taskIndex, 1);
          // Add to target
          newData[targetColumn as keyof typeof newData].push({
            ...task,
            status: { ...task.status, id: targetColumn }
          });
        }
        
        return newData;
      });
    }
  };

  return (
    <ComponentSection title="Kanban Board">
      <div className="h-96 overflow-auto">
        <KanbanProvider onDragEnd={handleDragEnd}>
          {Object.entries(kanbanData).map(([columnId, tasks]) => (
            <KanbanBoard key={columnId} id={columnId}>
              <KanbanHeader
                name={columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                color={columnId === 'todo' ? '--blue-500' : columnId === 'inprogress' ? '--yellow-500' : '--green-500'}
              />
              <KanbanCards>
                {tasks.map((task, index) => (
                  <KanbanCard
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    index={index}
                    parent={columnId}
                  />
                ))}
              </KanbanCards>
            </KanbanBoard>
          ))}
        </KanbanProvider>
      </div>
    </ComponentSection>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Vibe Kanban UI Kit Gallery</h1>
                <p className="text-sm text-muted-foreground">Component showcase and testing</p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <AlertsSection />
              <ButtonsSection />
              <BadgesSection />
              <FormSection />
              <InteractiveSection />
              <AdvancedSection />
              <KanbanSection />
            </div>
          </main>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;