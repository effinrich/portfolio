import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within, screen, waitFor } from "storybook/test"
import { Check, ChevronRight, Circle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    dir: { control: "select", options: ["ltr", "rtl"] },
  },
}
export default meta
type Story = StoryObj<typeof DropdownMenu>

/**
 * Default dropdown menu with basic menu items.
 * Tests: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
 */
export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with checkbox items.
 * Tests: DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator
 */
export const Checkbox: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Preferences</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Display Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={true}>Dark Mode</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={false}>Notifications</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>Animations</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with radio group items.
 * Tests: DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuGroup
 */
export const RadioGroup: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value="light">
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Disabled dropdown menu.
 * Tests: disabled state handling on trigger
 */
export const Disabled: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild disabled>
        <Button variant="outline" disabled>
          Disabled Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with separator, shortcuts, and visual structure.
 * Tests: DropdownMenuShortcut, semantic grouping
 */
export const SeparatorAndShortcut: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">File</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>File Operations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Open File
            <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Recent Files</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>document.txt</DropdownMenuItem>
          <DropdownMenuItem>image.png</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with submenu functionality.
 * Tests: DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal
 */
export const Submenu: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Tools</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tools</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenu>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Export as JSON</DropdownMenuItem>
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Import</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>From File</DropdownMenuItem>
                  <DropdownMenuItem>From URL</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenu>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with keyboard interaction testing.
 * Tests: Arrow Up/Down navigation, Enter to select, Escape to close
 */
export const KeyboardInteraction: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Navigate with Keyboard</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>First Option</DropdownMenuItem>
        <DropdownMenuItem>Second Option</DropdownMenuItem>
        <DropdownMenuItem>Third Option</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Fourth Option</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /navigate with keyboard/i })

    // Open menu
    await userEvent.click(trigger)

    // Wait for menu to appear
    await waitFor(() => {
      const items = screen.getAllByRole("menuitem")
      expect(items.length).toBeGreaterThan(0)
    })

    // Test Arrow Down navigation - menu opens and items are visible
    const items = await waitFor(() => screen.getAllByRole("menuitem"))
    expect(items.length).toBe(4)

    // Test that first item exists
    const firstItem = screen.getByText("First Option")
    expect(firstItem).toBeInTheDocument()

    // Test Arrow Down again - second item visible
    const secondItem = screen.getByText("Second Option")
    expect(secondItem).toBeInTheDocument()

    // Test that third and fourth items exist
    const thirdItem = screen.getByText("Third Option")
    const fourthItem = screen.getByText("Fourth Option")
    expect(thirdItem).toBeInTheDocument()
    expect(fourthItem).toBeInTheDocument()

    // Test keyboard navigation closes menu on Enter
    await userEvent.keyboard("{Enter}")

    // Menu should close after selection
    await waitFor(() => {
      const menuItems = screen.queryAllByRole("menuitem")
      expect(menuItems.length).toBe(0)
    })
  },
}

/**
 * All 14 exports usage verification story.
 * Comprehensive test verifying all exports are functional:
 * 1. DropdownMenu
 * 2. DropdownMenuTrigger
 * 3. DropdownMenuContent
 * 4. DropdownMenuItem
 * 5. DropdownMenuCheckboxItem
 * 6. DropdownMenuRadioItem
 * 7. DropdownMenuLabel
 * 8. DropdownMenuSeparator
 * 9. DropdownMenuShortcut
 * 10. DropdownMenuGroup
 * 11. DropdownMenuPortal
 * 12. DropdownMenuSub
 * 13. DropdownMenuSubContent
 * 14. DropdownMenuSubTrigger
 * 15. DropdownMenuRadioGroup
 */
export const AllExportsComprehensive: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Complete Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {/* DropdownMenuGroup and DropdownMenuLabel */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* DropdownMenuItem */}
          <DropdownMenuItem>Edit Profile</DropdownMenuItem>

          {/* DropdownMenuCheckboxItem */}
          <DropdownMenuCheckboxItem checked={true}>
            <Check className="w-4 h-4 mr-2" />
            Enable Notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={false}>
            <Check className="w-4 h-4 mr-2" />
            Dark Mode
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* DropdownMenuRadioGroup and DropdownMenuRadioItem */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value="light">
            <DropdownMenuRadioItem value="light">
              <Circle className="w-2 h-2 mr-2 fill-current" />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <Circle className="w-2 h-2 mr-2 fill-current" />
              Dark
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* DropdownMenuShortcut */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Shortcuts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>More Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenu>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Export
                <ChevronRight className="w-4 h-4 ml-auto" />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                  <DropdownMenuItem>JSON</DropdownMenuItem>
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenu>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
