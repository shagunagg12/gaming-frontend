// import { useState } from 'react';
// import { MenuItem } from 'routes/sitemap';
// import IconifyIcon from 'components/base/IconifyIcon';

// interface CollapseListItemProps extends MenuItem {}

// const CollapseListItem: React.FC<CollapseListItemProps> = ({ subheader, active, items, icon }) => {
//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className="pb-4">
//       <button
//         onClick={handleClick}
//         className="flex items-center w-full p-2 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
//       >
//         {icon && (
//           <IconifyIcon
//             icon={icon}
//             className={`mr-3 ${active ? 'text-primary' : 'text-gray-600'}`}
//           />
//         )}
//         <span className={`flex-1 text-left ${active ? 'text-primary' : ''}`}>{subheader}</span>
//         <IconifyIcon
//           icon="iconamoon:arrow-down-2-duotone"
//           className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${
//             active ? 'text-primary' : 'text-gray-400'
//           }`}
//         />
//       </button>

//       {open && (
//         <ul className="pl-9 mt-2 space-y-1">
//           {items?.map((route) => (
//             <li key={route.pathName}>
//               <a
//                 href={route.path}
//                 className={`block w-full px-2 py-1.5 rounded transition-colors duration-200 ${
//                   route.active ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
//                 }`}
//               >
//                 {route.pathName}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CollapseListItem;
