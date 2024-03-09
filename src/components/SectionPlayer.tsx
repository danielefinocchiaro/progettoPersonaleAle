import ControlsRigth from "./ControlsRight";
import Player from "./Player";
import PlayerLeft from "./PlayerLeft";
export default function SectionPlayer() {
  return (
    <div className="sticky bottom-0 z-20 h-[10vh] justify-between flex flex-row">
      <PlayerLeft />
      <Player />
      <ControlsRigth />
    </div>
  );
}
