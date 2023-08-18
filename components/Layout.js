// Layout.js
// import Menu from './Menu'; // Update the import path according to your project structure
// import Footer from './Footer';


// export default function Layout({ children }) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Menu />
//       <main className="flex-1">
//         {children}
//       </main>
//     </div>
//   );
// }




import Header from './Header';
import Footer from './Footer';


export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
    </div>
  );
}


// import React from 'react';
// import Header from './Header';

// const Layout = ({ children }) => (
//   <div>
//     {/* <Header /> */}
//     {/* <main> */}
//       {children}
//     {/* </main> */}
//   </div>
// );

// export default Layout;