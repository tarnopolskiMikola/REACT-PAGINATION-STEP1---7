import React, {useEffect, useState} from 'react';
//import axios from 'axios';
import Table from './table/table';
// import Loader from './loader/loader';
import DetailedItem from './datailItem/detailItem';
import useServerData from './hooks/useServerData';
import Switcher from './switcher/switcher';
import './datailItem/deteil.css';
import Paginator from './paginator/paginator';
function App() {

const baseUrl = 'http://www.filltext.com/?rows=32&id={...|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
// const [contactData , setContactDate] = useState([]);
const [isButtonClick, setIsButtonClick] = useState(false)
const [directionSort, setDirectionSort] = useState(true);
const [rowItem, setrowItem] = useState('');
const [url, setUrl] = useState('');
const [totalCountRow, setTotalCountRow] = useState(0);
const [totalCountPage, setTotalCountPage] = useState(0);
const [rowIsClick, setrowIsClick] = useState(false);
const [{contactData, setContactDate, isLoaded},  getData ] = useServerData({url, isButtonClick});
const [currentPage, setCurrentPage]  = useState(null);
const limitCountPage = 50;


const buttonHandler = (url) => {
  setUrl(url)
  setIsButtonClick(true)
  // console.log(url)
}

const lastBlockRow = currentPage*limitCountPage
const firstBlockRow =  lastBlockRow - limitCountPage
const currentBlockRows = contactData.slice(firstBlockRow,lastBlockRow)
 


const currentPagef = (pag) =>{
  setCurrentPage(pag)
}

useEffect(()=>{
  if(!isLoaded){
    return
  }
  setTotalCountRow(contactData.length)
  const  getTotalCountPage = totalCountRow/limitCountPage;
  setTotalCountPage(getTotalCountPage)
  // console.log(totalCountRow + " ---- dlina dla plaginator Row")
  // console.log( getTotalCountPage + " ---- dlina dla plaginator Page")
  currentPagef()
  
},[isLoaded, setTotalCountRow, contactData.length, totalCountRow ])
// console.log(currentPage+'------------ currentPage------------')


let pages = []
for(let i=1; i<= totalCountPage; i++){
  pages.push(i)
}
// console.log(pages )
 






const sortData = (field) => {


 const copyData = contactData.concat();
 let sortData;
 if (directionSort) {
 sortData = copyData.sort(
 (a, b)=> {return a[field] > b[field] ? 1 : -1}
 )
} sortData = copyData.reverse(
  (a, b)=> {return a[field] > b[field] ? 1 : -1}
  )
 setContactDate(sortData)
 setDirectionSort(!directionSort)
}


// const [isLoading, setIsLoading] = useState(true);
 



const detailRow = (row)=>{
  setrowItem(row)
  setrowIsClick(true)
}
const onNextClick =() =>{
  if(currentPage>totalCountPage-1){
    return  
  }
  setCurrentPage(currentPage+1)
  
}

const onPreviousClick =() =>{
  
  if(currentPage<2){
    return  
  }
  setCurrentPage(currentPage-1)
}

 

let i = -1;
  return (
     <div className="container">
       {/* <Loader/> */}
     <Switcher buttonHandler={buttonHandler}/>
     {rowIsClick? <DetailedItem   detailItemData={rowItem} /> : null}
     <Paginator pages={pages} currentPagef={currentPagef} onNextClick={onNextClick} onPreviousClick={onPreviousClick}/>
       <Table 
       contactData={currentBlockRows}
       sortData={sortData}
       directionSort={directionSort}
       detailRow={detailRow}
      i={i}
      firstBlockRow={firstBlockRow}
       />
        
       
     {/* {isLoading? <Loader/> : <Table smallData={smallDate} />} */}
     {/* {isLoading ? ( // если тру возращаем прелоадер
                <Loader/>
            ) : (
              <Table smallData={smallDate} />
            )} */}
     </div>
  );
}

export default App;
