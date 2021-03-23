import { connect } from "react-redux"
import { addToVideoSets } from "../actions";

const AddCard = ({ addToVideoSets }) => (
  <a className="panel-block" onClick={addToVideoSets}>
    <span class="icon-text">
      <span class="icon has-text-link">
        <i class="fas fa-plus"></i>
      </span>
      <span>Add new set</span>
    </span>
  </a>
)

const mapDispatchToProps = dispatch => ({
  addToVideoSets: () => dispatch(addToVideoSets())
}) 

export default connect(null, mapDispatchToProps)(AddCard);