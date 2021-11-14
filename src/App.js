import InvoiceList from "./Components/InvoiceList";
import { InvoiceProvider } from "./Context/InvoiceContext"
import { Routes, Route } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import Header from "./Components/Header";

function App() {
  return (
    <InvoiceProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<InvoiceList />} />
          <Route path="/invoices/:id" element={<InvoicePage />} />
        </Routes>
    </InvoiceProvider>
  );
}

export default App;
