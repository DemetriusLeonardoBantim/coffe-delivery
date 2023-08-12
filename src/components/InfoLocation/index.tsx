import { useEffect, useState, useCallback } from 'react'
import { Container, Content, Legend } from './style'

export function InfoLocation() {
    const [location, setLocation] = useState('');

    const getCoordinates = useCallback((position: any) => {
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const cidade = data.address.city || data.address.town || data.address.village;
            const estado = data.address.state;
    
            const localizacao = `${cidade}, ${estado}`;
            setLocation(localizacao);
          })
          .catch(error => {
            console.log("Erro ao obter informações de localização:", error);
          });
      }, []);
    
      const getLocation = useCallback(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCoordinates);
        } else {
          console.log("Geolocalização não suportada pelo navegador.");
        }
      }, [getCoordinates]);
    
      useEffect(() => {
        getLocation();
      }, [getLocation]);

    return(

        <Container>
            <Content>
                <Legend>
                    {location}
                </Legend>
            </Content>
        </Container>

    )
}