import * as ReactIcons from 'react-icons/fa'; 

function IconWithProps({ iconName, selectedIcon, onClick }) {
  const IconComponent = ReactIcons[iconName];
  return (
    <IconComponent
      size={50}
      className={`${
        selectedIcon === iconName
          ? 'bg-slate-500 text-white'
          : 'bg-slate-100 text-slate-500'
      } border rounded p-2 cursor-pointer`}
      onClick={onClick}
    />
  );
}

export default IconWithProps;