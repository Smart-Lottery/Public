import React, {useEffect} from "react";
import "../index.scss";
import { ReadWhitePaperList } from '../components/ReadWhitePaperList/ReadWhitePaperList';

export const ReadWhitePaper = () =>  {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
     
    return (
      <div className='page'>
      <ReadWhitePaperList />
    </div>
    );
  }