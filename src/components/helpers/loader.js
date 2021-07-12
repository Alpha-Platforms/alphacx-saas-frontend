import HoldOn from 'react-hold-on'

var options = {
  theme:"sk-dot",
  message:'Ibank',
  backgroundColor:"#ABB2BF",
  textColor:"white"
};
// HoldOn.open({
//   theme: "sk-cube-grid"
// })


export const showLoader = () => {
  HoldOn.open(options);
};

export const hideLoader = () => {
  HoldOn.close()
};