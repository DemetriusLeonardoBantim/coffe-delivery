import logo from '../../assets/logo.svg'
import { InfoLocation } from '../InfoLocation'

export function Header() {
    return (
        <>
            <img src={logo} alt='logo'/>
            <InfoLocation/>
        </>
    )
}