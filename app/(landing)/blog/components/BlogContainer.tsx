import { ReactNode } from 'react';

interface BlogContainerProps {
  children: ReactNode;
}

export default function BlogContainer({ children }: BlogContainerProps) {
  return <div className="container mx-auto px-5">{children}</div>
}