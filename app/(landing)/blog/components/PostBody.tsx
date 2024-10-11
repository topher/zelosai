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
    if (!src) return null;
    return <Image alt={alt || ''} src={src} title={title} className={styles.customImage} width={500} height={500} />;
  },
  h1: ({ children }) => <h1 className={styles.heading1}>{children}</h1>,
  h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
  h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
  ul: ({ children }) => <ul className={styles.unorderedList}>{children}</ul>, // Use unorderedList class
  li: ({ children }) => <li className={styles.listItem}>{children}</li>, // Use listItem class
  p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
};

interface PostBodyProps {
  content: string;
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className={styles.postBody}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={{
          img: customRenderers.img,
          h1: customRenderers.h1,
          h2: customRenderers.h2,
          h3: customRenderers.h3,
          ul: customRenderers.ul,
          li: customRenderers.li,
          p: customRenderers.p,
        }} 
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
