import "../styles/header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <img src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" alt="Carwale Logo" className="logo" />
        <nav className="nav-links">
          <a href="#" className="nav-link disabled-link" onClick={(e) => e.preventDefault()}>NEW CARS</a>
          <a href="#" className="nav-link disabled-link" onClick={(e) => e.preventDefault()}>USED CARS</a>
          <a href="#" className="nav-link disabled-link" onClick={(e) => e.preventDefault()} >REVIEWS & NEWS</a>
        </nav>
      </div>
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span className="search-icon">
            <svg width="20" height="20" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
        </div>
      </div>
      <div className="header-right">
        <span className="icon-btn">
          <img className="location-logo" src='data:image/png;base64,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' />
        </span>
        <span className="icon-btn">
          <img className="user-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAM1BMVEX///+8vLz09PS5ubn4+Pi2trba2tr8/Pzn5+fExMTw8PDBwcHs7OzMzMzR0dHU1NTh4eH0KMm5AAAENUlEQVR4nO2biY6rMAxFmw2ysP3/175AlwFK7NROWukpVxqNVA3TwyWxHSfcbk1NTU1NTU1NTU1NTU1NTaXUa+mHwUvd/5pkVe9tNwqzUxg763/I1tvJCaWUOGj9wE32J1zajsqceHZkRo1WfxupC2eH3rhU6L6J5ee0R0e/Zv8lJD2LLKQNS8zfcKtfsOd2fopL9TEv3UdIG5aTdZm6j5E2rK4ikh5JTJFqrDayZP4Af6MSlaahpRLdZaswkW16mFWBamEyRaqlNBPXpxpelWAqTeVLIK0qOAd1KGJUtCqUi1fUmHlBNZZiouWWBFWhjCMLMkWqItm5dyWZhHAlKhl+1DyqRAzVhZkiFX8GzjlQShlz/8n545nLlBE24zJvXryO8nZ2OeUNN4SiRik1Wam13BR/2wm1i2uVNtgXjP4B9JT2aKw1vFGFxU3VyRNTpJL4VSyjAnLP9g1pw8KKVFYKxCqWayacilXDwKNDpZhWKvhKRl7u4f88J5kiFTxtFT3XWHDuuTTSKjBlGvrzm6C7VQtgVLRqAZ2aqExwfRBApkgFzlxyrQCmGNVhUHC0oqYacAYpDzNJOYCXUwcVeKvIMF8FPX1yUIeilJpwKGiekCMVNFLBIPUYVGCoCkQoKEqh4xwb6YbG1NeFosUEsJbiQ9EKBQlCZYwpGIq2/vMgFHP2CUOLngMnHa+CU/JQAQqP6B5MM0Qo8PGxcx/x8YEDnVslUAc6srxC6ym4vieGBDB4Cl7lSQ6eYJoRvBqdnGbAhLxRkVczgp6Q8VbnkFr3DdiV5NIF73WGayptMZPpRV5OR/9qCsILmQcUtRzOaelfdl0yriMvHLJasErMg35xaT3kbXvT27Fgmt9huW64Mw1dViePsxhFlu377zAiOBdE3nEFwVq2ww0OsZn03kxUCreL0eDAWkEhPrbFHe1Rxi3xMcJbTKwtGigoRKS1tai1n912Fmg9DhTc7NdhryWIxWqaAeXHrtsZp5xdulX2byKCnU/eDlvqHyt3DE96s0cfP/Op0x7MraxETWUumsIXkV12icuZGyGXFUhIlwcnrMuGLHsf5CLVKJUqDi6ohqvowN5JfrMqDqdcpFXvA4u/YfS2tabEOQMjXvmzVwW21s6bkOEjnzavjnGlyEGOY61g8sfTy6vjqrbIdu1hYxtZVyWo9maX2djeR1A1EZgi1V8NVO7Q2TMvK2xVnKR6JsJyhyVu+nmflsa0C6IFj8H5R4AhGvW3Ni16CO5ew1CRVm13Vf4AFWnmvaxaahyAW0xG7w6SM8WPv0UqjlGrVRWYYmjnOVXpBDGLqt6pZnpIqHnSmhrRKyLdiI+w/ksYn5cu1ZE+xvra+z19/sLhq6/PZGF9+8WZW4/Z9av3stJcP31TrI+GnXueOn74Q6Sd+rt+jdHU1NTU1NTU1NTU1NTU9D/pH2s0NlASdE2nAAAAAElFTkSuQmCC" />
        </span>
      </div>
    </header>
  );
};

export default Header