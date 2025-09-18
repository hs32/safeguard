import { useMDXComponents as getThemeComponents } from "nextra-theme-blog"; // nextra-theme-blog or your custom theme

// Get the default MDX components
const themeComponents = getThemeComponents();

// Merge components
interface MDXComponents {
  [key: string]: React.ComponentType<any>;
}

interface UseMDXComponents {
  (components?: MDXComponents): MDXComponents;
}

export const useMDXComponents: UseMDXComponents = (components = {}) => {
  return {
    ...themeComponents,
    ...components,
  };
};
