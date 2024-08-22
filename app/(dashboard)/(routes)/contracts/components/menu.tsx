import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
  export function Menu() {
    return (
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Contracts</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About Contracts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Hide Contracts... <MenubarShortcut>⌘H</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut>
            </MenubarItem>
            <MenubarShortcut />
            <MenubarItem>
              Quit Contracts <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative">File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>New</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                <MenubarItem>
                  Contract <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>
                  Contract from Template <MenubarShortcut>⇧⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Smart Contract... <MenubarShortcut>⌥⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>Contract Folder</MenubarItem>
                <MenubarItem disabled>Automated Contract</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              Open Contract... <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Close Window <MenubarShortcut>⌘W</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Library</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Update Cloud Library</MenubarItem>
                <MenubarItem>Organize Library...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Import Contract...</MenubarItem>
                <MenubarItem disabled>Export Contract...</MenubarItem>
                <MenubarItem>Show Duplicate Contracts</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Get Contract Artwork</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              Import... <MenubarShortcut>⌘I</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Export Contract to PDF...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
            </MenubarItem>
            <MenubarItem>Convert</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Page Setup...</MenubarItem>
            <MenubarItem disabled>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Select All <MenubarShortcut>⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Smart Dictation...{" "}
              <MenubarShortcut>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                  <circle cx="17" cy="7" r="5" />
                </svg>
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Emoji & Symbols{" "}
              <MenubarShortcut>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Show Recent Contracts</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Show Clauses</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset disabled>
              Show Status Bar
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
            <MenubarItem disabled inset>
              Enter Full Screen
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="hidden md:block">Account</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarLabel inset>Switch Account</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Manage Family...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Account...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }