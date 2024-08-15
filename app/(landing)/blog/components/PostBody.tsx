import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import styles from './PostBody.module.css';

interface ImgProps {
  alt?: string;
  src?: string;
  title?: string;
}

const customRenderers = {
  img: ({ alt, src, title }: ImgProps) => {
    if (!src) {
      return null; // Handle case where src is not provided
    }
    return <Image alt={alt || ''} src={src} title={title} className={styles.customImage} width={500} height={500} />;
  },
};

interface PostBodyProps {
  content: string;
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.postBody}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={{
          img: customRenderers.img,
        }} 
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
