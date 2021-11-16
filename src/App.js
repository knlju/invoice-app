import InvoiceList from "./Components/InvoiceList";
import { InvoiceProvider } from "./Context/InvoiceContext"
import { Routes, Route } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import Header from "./Components/Header";

import Wrapper from "./Components/Styles/Wrapper.style";

function App() {
  return (
    <InvoiceProvider>
        <Wrapper>
        <Header/>
        <Routes>
          <Route exact path="/" element={<InvoiceList />} />
          <Route path="/invoices/:id" element={<InvoicePage />} />
        </Routes>
        </Wrapper>
    </InvoiceProvider>
  );
}

export default App;
