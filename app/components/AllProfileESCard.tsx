import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Portal from '@/app/components/Portal';
import Loader from '@/app/components/Loader';
import ImageCard from '@/app/components/ImageCard';
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web';

interface AllProfileESCardProps {
  textColor: string;
  openSideBar: boolean;
  onCardClick: (data: any) => void;
  hitsPerPage?: number;
  sideBarWidth: string;
  leftTitleKey: string;
  cardTitleKey: string;
  cardImageKey: string;
  rightTitleKey: string;
  sideBarContent: React.ReactNode;
  leftSubTitleKey?: string;
}

const AllProfileESCard: React.FC<AllProfileESCardProps> = memo(({
  textColor,
  openSideBar,
  onCardClick,
  hitsPerPage = 30,
  sideBarWidth,
  leftTitleKey,
  cardTitleKey = 'label',
  cardImageKey = 'thumbnail',
  rightTitleKey = 'default_language',
  sideBarContent,
  leftSubTitleKey = 'description',
}) => {
  const { hits } = useHits();
  const { query, refine } = useSearchBox();
  const [isLoading, setIsLoading] = useState(false);  // Add loading state

  const sideBarRef = useRef<HTMLDivElement>(null);
  const [sideBarMinHeight, setSideBarMinHeight] = useState<number>();
  const [sideBarMaxHeight, setSideBarMaxHeight] = useState<number>();

  const debouncedOnChange = useCallback(debounce(() => {
    if (sideBarRef.current && sideBarRef.current.clientHeight && !sideBarMinHeight) {
      const sideBarHeight = sideBarRef.current.clientHeight;
      const totalCardPortionCovered = Math.ceil(sideBarHeight / 200);
      const finalMaxHeight = totalCardPortionCovered * 181 + 15 * (totalCardPortionCovered - 1);
      const finalMinHeight = totalCardPortionCovered < 3 ? finalMaxHeight : finalMaxHeight;
      setSideBarMinHeight(finalMinHeight);
      setSideBarMaxHeight(finalMaxHeight);
    }
  }, 50), [sideBarRef.current?.clientHeight]);

  useEffect(() => {
    if (!sideBarMinHeight) {
      debouncedOnChange();
    }
  }, [sideBarRef.current?.clientHeight]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate an async search action, you should replace this with your real search action
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate loading for 500ms
  }, [hits]);

  return (
    <div className="w-full h-full flex">
      <div
        className={`transition-all ease-in-out z-1 bg-gradient-to-r from-[#eaefed80] to-[#8da3cc80] rounded-[10px] overflow-hidden ${openSideBar ? 'mr-4' : ''}`}
        style={{
          minHeight: `${sideBarMinHeight}px`,
          maxHeight: `${sideBarMaxHeight}px`,
          width: openSideBar ? sideBarWidth : 0,
        }}
        ref={sideBarRef}
      >
        {sideBarContent}
      </div>
      <div className="flex-1 transition-all ease-in-out z-0">
        <input
          type="text"
          value={query}
          onChange={(e) => refine(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 mb-4 border rounded"
        />
        {hits.map((hit: any) => {
          console.log("weee  🥳",hit, cardImageKey,hit.thumbnail, hit.cardImageKey )
          const image = hit.thumbnail;
        //   const imageUrl = image ? image : 'placeholder_avatar.png';  // Use a placeholder image if `thumbnail` is missing
        const imageUrl = 'chat-bubble/chat-bubble-dynamic-premium.png';  // Use a placeholder image if `thumbnail` is missing

          return (
            <div key={hit._id} className="w-[32.3%] inline-block mr-4">
              <ImageCard
                textColor={textColor}
                image={imageUrl}
                cardTitle={hit.label}
                leftTitle={hit._score}
                rightTitle={hit.default_language}
                onClick={() => onCardClick(hit._source)}
                leftSubTitle={hit.leftSubTitleKey}
              />
            </div>
          );
        })}
      </div>
      {isLoading && <Portal><Loader show={true} /></Portal>}
    </div>
  );
});

export default AllProfileESCard;
