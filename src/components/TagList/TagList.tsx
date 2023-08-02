import React from 'react'
import { Link } from 'react-router-dom';
interface TagListProps {
    setFilter: (filter: {filter: string, isFilterByTag: boolean, tag: string}) => void ; 
    setPage: (page: number) => void;
    allTag: string[]
    tagLoading: boolean
}
const TagList = ({setFilter, setPage, allTag, tagLoading}: TagListProps) => {
    const handleFilterByTag = (tag: string): void => {
        setFilter({filter: '',isFilterByTag: true, tag: tag });
        setPage(1);
      };
    
  return (
    <div className="col-md-3">
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tagLoading ? (
          <p>Loading tags...</p>
        ) : (
          allTag.map((tag, index) => {
            return (
              <Link
                to=""
                onClick={() => handleFilterByTag(tag)}
                className="tag-default tag-pill"
                key={index}
              >
                {tag}
              </Link>
            );
          })
        )}
      </div>
    </div>
  </div>
  )
}

export default TagList