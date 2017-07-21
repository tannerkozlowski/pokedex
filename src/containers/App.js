import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import Pokemon from '../components/Pokemon'
import * as pageActions from '../actions/PageActions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  fetchPokemons() {
    this.props.pageActions.fetchPokemons(this.state.offset)
  }

  componentDidMount() {
    this.fetchPokemons()
  }

  handlePageChange(data) {
    this.setState({ offset: data.selected * 20 }, () => {
      this.fetchPokemons()
    })
  }

  render() {
    let { pokemons } = this.props.page

    pokemons = pokemons.map((pokemon, index) => {
      let { url } = pokemon
      pokemon.id = url.substring(34, url.length - 1)

      return (
        <Pokemon pokemon={pokemon} key={index} />
      )
    })

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-3 col-lg-2">
            Coming soon...
          </div>
          <div className="col-sm-8 col-md-9 col-lg-10">
            <table className="user-list table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.page.isFetched
                  ?
                  <tr><td>Loading...</td></tr>
                  :
                  pokemons
                }
              </tbody>
            </table>
            <ReactPaginate
              pageCount={41}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
              onPageChange={this.handlePageChange}
              containerClassName="pagination"
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
