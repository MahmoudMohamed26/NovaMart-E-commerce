import React from 'react';
import ReactPaginate from 'react-paginate';

export default function PaginatedItems({ total , setPage , limit }) {
    const pageCount = Math.ceil(total/limit)
  return (
    <div className='flex-1'>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => {
          setPage(e.selected + 1);
          window.scrollTo({top: 0, behavior: 'smooth'});
        }}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName='flex justify-end gap-5'
        nextLinkClassName='p-1 px-3 text-sm text-blue-600 font-bold rounded-sm border-blue-600'
        previousLinkClassName='p-1 px-3 text-sm text-blue-600 font-bold rounded-sm border-blue-600'
        pageLinkClassName='p-1 px-3 text-sm bg-white border border-blue-600 font-bold text-blue-600 rounded-sm hover:bg-blue-600 hover:text-white duration-300'
        activeLinkClassName='!text-white !bg-blue-600'
      />
    </div>
  );
}