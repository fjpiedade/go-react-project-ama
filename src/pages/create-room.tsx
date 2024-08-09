import amaLogo from "../assets/ama-logo.svg";
export function CreateRoom() {
  return (
    <>
      <main className="h-screen flex items-center justify-center">
        <div>
          <img src={amaLogo} alt="Logo AMA - Ask me Anything" />
          <form>
            <input type="text" />
            <button>Create a Room</button>
          </form>
        </div>
      </main>
    </>
  );
}
