import { Container } from "@mui/material"
import type { ReactNode } from "react"

type StyledPageProps = {
    children: ReactNode
}

export const StyledPage = ({ children }: StyledPageProps) => {
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {children}
        </Container>
    )
}

export default StyledPage