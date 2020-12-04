import fs from 'fs'
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import path from 'path'

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'xS5f52rNz7Js60xZnnC9mz1zNb_VcYFGaoIfBVALVO5I',
  }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/8d753ad4-523e-4d12-9156-bf8d443d0c93',
})

export function processTTS(filePath: string, fileName: string): void {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) console.log('Não foi possível salvar o arquivo')

    const synthesizeParams = {
      text: data,
      accept: 'audio/wav',
      voice: 'pt-BR_IsabelaV3Voice',
    }

    textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        // only necessary for wav formats,
        // otherwise `response.result` can be directly piped to a file
        return textToSpeech.repairWavHeaderStream(response.result)
      })
      .then(buffer => {
        fs.writeFileSync(path.join(__dirname, '..', 'uploads', 'audios', `${fileName}.wav`), buffer)
      })
      .catch(err => {
        console.log('error:', err)
      })
  })
}
