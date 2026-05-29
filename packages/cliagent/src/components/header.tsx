const Header = () => {
  return (
    <box justifyContent="center" alignItems="center">
        <box flexDirection="row" justifyContent="center" gap={0.5} alignItems="center">
            <ascii-font font="tiny" text="CLI" color="gray" />
            <ascii-font font="tiny" text="AGENT" />
        </box>
    </box>
  )
}

export default Header