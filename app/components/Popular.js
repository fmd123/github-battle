var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props){
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      < ul className = 'languages' >
      {languages.map(function(lang) {
        return (
          <li
            style= {lang === props.selectedLanguage ?
              {color: '#d0021b'}: null} onClick={props.onSelect.bind(null, lang)} // null because already established what state it will be on line 9.
  //can also pass other arguments besides context
  //lang where clicked will be passed to updateLanguage
            key={lang}>
              {lang}
          </li>
        )
      })}
      < /ul>
    )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
    }
    this.updateLanguage = this.updateLanguage.bind(this);
    // above line is what keeps "this" always bound to correct context
    // .bind() takes in a context and then return a new function
    //here the context being taken in is the 'this' variable for whatever is being clicked.
  }

  updateLanguage(lang){
    this.setState(function(){
      return{
        selectedLanguage: lang
      }
    })
  }
  render(){

    return(
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />
      </div>
    )
  }
}

module.exports = Popular;
