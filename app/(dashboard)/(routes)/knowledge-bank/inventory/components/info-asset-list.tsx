import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { parse } from 'date-fns/parse' // Using date-fns for example
import { useInfoAsset } from "../../use-info-asset";
import { InfoAsset } from "@/app/types";

export function InfoAssetList({ infoAssets }: { infoAssets: InfoAsset[] }) {

  const { infoAsset, updateInfoAsset } = useInfoAsset();

  const handleAssetSelection = (infoAsset: InfoAsset) => {
    updateInfoAsset(infoAsset); // Assuming a state management solution with setInfoAsset
  };

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
          {infoAssets?.length > 0 && (
            <div className="flex flex-col gap-2 p-4 pt-0">
                {infoAssets.map((infoAsset) => (
                <div
                  key={infoAsset.URI}
                  onClick={() => handleAssetSelection(infoAsset)}
                  className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="font-semibold">{infoAsset.name}</div>
                    <div className="ml-auto text-xs">
                    {infoAsset.creation_date && (
                      <>
                        {formatDistanceToNow(
                          parse(infoAsset.creation_date, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
                          { addSuffix: true }
                        )}
                      </>
                    )}
                    {!infoAsset.creation_date && <span>Invalid Date</span>}
                    </div>
                  </div>
                  {infoAsset.category && (
                    <div className="text-xs font-medium">{infoAsset.category}</div>
                  )}
                </div>
                
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    {infoAsset.content?.substring(0, 300)}
                  </div>
                
                <div className="flex items-center justify-between mt-2">
                  {infoAsset.dcma_registrant_email && (
                    <span className="text-xs text-muted-foreground">
                      DCMA: {infoAsset.dcma_registrant_email}
                    </span>
                  )}
                  {infoAsset.labels && infoAsset.labels.length > 0 && (
                    <div className="flex items-center gap-2">
                      {infoAsset.labels.map((label) => (
                        <Badge key={label} variant="secondary">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>
    )}

    </div>
    </ScrollArea>
  );
}