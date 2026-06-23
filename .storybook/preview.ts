import type { Preview } from "@storybook/react-vite"
import { withThemeByClassName } from "@storybook/addon-themes"
import theme from "./theme"
import "../src/styles.css"

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: { disable: true },
    layout: "centered",
    a11y: {
      test: "error",
    },
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
    options: {
      storySort: {
        order: ["Design System", ["Introduction", "Foundations"], "UI"],
      },
    },
    docs: {
      theme,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
}

export default preview
