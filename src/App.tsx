import { StoreProvider } from "easy-peasy";
// import Contract from "./components/tokenContract";
import User from "./components/user";
import { store } from "./store";
import Connection from "./components/Connection";
import SpenderContract from "./components/spender";
import User2 from "./components/user2";

function App() {
  return (
    <StoreProvider store={store}>
      <div className="flex flex-col justify-center items-center w-2/3 mx-auto">
        <div className="mb-4">
          <Connection />
          {/* <Contract /> */}
        </div>

        <div className="flex w-[70rem] gap-10">
          <User />
          <SpenderContract />
        </div>

        <div className="flex w-[70rem] mt-4">
          <User2 />
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
