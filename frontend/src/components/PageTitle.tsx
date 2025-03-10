import { useEffect } from "react";

interface PageTitleProps {
  title: string;
}

/**
 * Component that sets the browser tab title
 */
export function PageTitle({ title }: PageTitleProps) {
  useEffect(() => {
    // Save the original title to restore it when the component unmounts
    const originalTitle = document.title;

    // Set the new title
    document.title = `${title} | New World Builds`;

    // Restore the original title when the component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  // This component doesn't render anything
  return null;
}
