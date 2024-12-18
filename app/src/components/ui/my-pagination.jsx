import { Pagination,PaginationItem,PaginationPrevious,PaginationNext,PaginationLink, PaginationContent } from "./pagination";

function PaginationNavigator({
    numPages,
    currentPage,
    setCurrentPage,
    orientation="horizontal",
    ...props
}){

    return (
        <Pagination
            className={`
                ${orientation!=='vertical' ? "w-full" :""}
                ml-2
                mr-4
            `}>
            <PaginationContent className={`
                ${orientation==='vertical' ? "flex-col" :""}
            `}>
                <PaginationItem>
                    <PaginationPrevious
                        className={`
                            bg-transparent
                            text-icon-brand
                            ${orientation==='vertical' ? "rotate-90" :""}
                        `}
                        href="#"
                        isActive={currentPage === 0}
                        onClick={()=>setCurrentPage(
                            Math.max(
                                0,
                                currentPage-1
                            )
                        )}
                    />
                </PaginationItem>
                {Array.from({length:numPages}).map(
                    (_,idx) =>(
                        <PaginationItem key={`pagination-item-${idx}`}>
                            <PaginationLink 
                            className={`
                            text-text-brand
                            w-4 h-4 p-3 rounded-full
                            ${idx===currentPage ? "border border-text-brand" : ""}
                            `
                        }
                                isActive={idx===currentPage}
                                href="#"
                                onClick={() => {
                                    setCurrentPage(idx)
                                }}
                            >
                                {idx+1}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}
                <PaginationItem>
                    <PaginationNext
                        className={`
                            bg-transparent
                            text-icon-brand
                            ${orientation==='vertical' ? "rotate-90" :""}
                        `}
                        href="#"
                        isActive={currentPage === (numPages-1)}
                        onClick={()=>setCurrentPage(
                            Math.min(
                                numPages-1,
                                currentPage+1
                            )
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationNavigator;