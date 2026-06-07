import type { Preview } from "@storybook/react-vite"
import { withThemeByClassName } from "@storybook/addon-themes"
import "../src/styles.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i }
    },
    backgrounds: { disable: true },
    layout: "centered"
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light"
    })
  ]
}

export default preview
