import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DesignPattern {
  id: string
  title: string
  description: string
  code: string
  example: React.ReactNode
}

interface DesignPatternModalProps {
  pattern: DesignPattern
  onClose: () => void
}

export default function DesignPatternModal({ pattern, onClose }: DesignPatternModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{pattern.title}</DialogTitle>
          <DialogDescription>{pattern.description}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="example" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="example" className="mt-4">
            <div className="p-4 rounded-md bg-zinc-100 dark:bg-zinc-800">
              {pattern.example}
            </div>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <pre className="p-4 rounded-md bg-zinc-100 dark:bg-zinc-800 overflow-x-auto">
              <code className="text-sm">{pattern.code}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

