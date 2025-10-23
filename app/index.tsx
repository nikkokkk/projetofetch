import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./components/styles";

export default function appFetch() {

    const [cidade, setCidade] = useState("");
    const [clima, setClima] = useState(null);

    const buscarClimaFetch = async () => {
        try {
            const resposta = await fetch(
                        `https://api.weatherapi.com/v1/current.json?key=74a52a65f6464aafb4f221001252210&q=${cidade}&lang=pt`

            )
            const dados = await resposta.json()
            setClima(dados);

        } catch (erro) {
            console.error("Erro ao buscar previsão:", erro)
        }
    }


    return (
    <View style={styles.container}>    
            <Text style={styles.title}>Clima com Fetch</Text>

            <TextInput
            style={styles.input}
            placeholder="Digite o nome da cidade"
            value={cidade}
            onChangeText={setCidade}
            />

        <Button title="Buscar Previsão" onPress={buscarClimaFetch} />

      {clima && clima.current && (
        <View style={styles.resultado}>
          <Text style={styles.info}>
             Cidade: {clima.location.name}, {clima.location.region}
          </Text>
          <Text style={styles.info}>Temperatura: {clima.current.temp_c}°C</Text>
          <Text style={styles.info}>Condição: {clima.current.condition.text}</Text>
        </View>
      )}
    </View>
  )

  }
