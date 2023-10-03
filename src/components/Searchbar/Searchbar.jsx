import React, { Component } from 'react';
import css from "./Searchbar.module.css"



export class Searchbar extends Component {

  handleSubmit =e=>{
    const {onSubmit} = this.props
    e.preventDefault()
     const query =  e.target.elements.query.value.trim()
     onSubmit(query)
  }
 render() {return (

  <header className={css.searchbar}>
    <form className={css.searchForm} onSubmit={this.handleSubmit}>
        <button className={css.searchButton}>
            <span className={css.searchButtonLabel}>Search</span>
        </button>
        <input className={css.searchInput} name="query" type="text" placeholder="Search images and photos"  autoFocus  autoComplete="off" />
    </form>
  </header>);}
};
