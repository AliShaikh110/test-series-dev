// components/KeyboardShortcuts.tsx
import { Card } from "@/components/ui/card";

export default function KeyboardShortcuts() {
  return (
    <Card className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 rounded-2xl overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
          Keyboard Shortcuts
        </h3>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Next Question
            </span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              →
            </kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Previous Question
            </span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              ←
            </kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Flag Question
            </span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              F
            </kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Select Option A-D
            </span>
            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              A-D
            </kbd>
          </div>
        </div>
      </div>
    </Card>
  );
}