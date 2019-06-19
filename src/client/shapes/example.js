import PropTypes from 'prop-types';

export default PropTypes.shape({
  variantName: PropTypes.string,
  brandName: PropTypes.string,
  drugName: PropTypes.string.isRequired,
  brandDesc: PropTypes.string,
  prodDesc: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  vmpId: PropTypes.string.isRequired,
});
