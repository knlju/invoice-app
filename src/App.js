import { InvoiceProvider } from "./Context/InvoiceContext"
import { Routes, Route } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import Header from "./Components/Header";

import Wrapper from "./Components/Styles/Wrapper.style";
import InvoicesWrapper from "./Components/InvoicesWrapper";



function App() {
  return (
    <InvoiceProvider>
        <Wrapper>
        <Header/>
        <Routes>
          <Route exact path="/" element={<InvoicesWrapper />} />
          <Route path="/invoices/:id" element={<InvoicePage />} />
        </Routes>
        </Wrapper>
    </InvoiceProvider>
  );
}

export default App;
