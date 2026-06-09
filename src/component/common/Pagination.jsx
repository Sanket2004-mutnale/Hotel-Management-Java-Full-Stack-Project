import React from "react";

const Pagination = ({ roomPage, totalRooms, currentPage, paginate }) => {
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRooms / roomPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-6">
            <ul className="flex space-x-2">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`px-4 py-2 rounded-md border transition-all duration-200
                                ${
                                    currentPage === number
                                        ? "bg-teal-600 text-white border-teal-600 shadow"
                                        : "bg-white text-teal-700 border-teal-500 hover:bg-teal-500 hover:text-white"
                                }
                            `}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;


// import React from "react";


// const Pagination =({roomPage,totalRooms,currentPage,paginate}) =>{

//     const pageNumbers = [];

//     for(let i=1; i<Math.ceil(totalRooms/roomsPerPage); i++){
//         pageNumbers.push(i)
//     }

//     return(
//         <div className="pagination-nav">
//             <ul className="pagination-ul">
//                 {pageNumbers.map((number)=>(
//                     <li key={number} className="pagination-li">
//                         <button onClick={()=>paginate(number)} className={`pagination-button ${currentPage === number} ? 'current-page':''`}>{number}</button>
//                     </li>
//                 ))
//                 }
//             </ul>
//         </div>
//     )
// }
// export default Pagination;