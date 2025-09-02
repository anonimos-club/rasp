"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPixPage() {
  const [pixCode, setPixCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState("")

  const handlePayment = async () => {
    if (!pixCode.trim()) {
      setResult("❌ Por favor, cole o código PIX")
      return
    }

    setIsProcessing(true)
    setResult("🔄 Processando pagamento...")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Send webhook to test the system
      const webhookData = {
        id: `test-${Date.now()}`,
        external_id: `external-${Date.now()}`,
        status: "AUTHORIZED",
        total_amount: 30.0,
        payment_method: "PIX",
      }

      const response = await fetch("/api/webhooks/genesis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (response.ok) {
        setResult("✅ Pagamento simulado com sucesso! Webhook enviado.")
      } else {
        setResult("⚠️ Pagamento simulado, mas webhook falhou")
      }
    } catch (error) {
      setResult("❌ Erro ao processar pagamento")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Teste de Pagamento PIX</CardTitle>
            <p className="text-slate-300">Cole o código PIX e clique em pagar para testar</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Código PIX (Copia e Cola)</label>
              <Textarea
                value={pixCode}
                onChange={(e) => setPixCode(e.target.value)}
                placeholder="Cole aqui o código PIX que você copiou do site..."
                className="min-h-[120px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing || !pixCode.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
            >
              {isProcessing ? "Processando..." : "💳 Pagar Agora"}
            </Button>

            {result && (
              <div className="p-4 rounded-lg bg-slate-700 border border-slate-600">
                <p className="text-white text-center">{result}</p>
              </div>
            )}

            <div className="text-center text-sm text-slate-400">
              <p>Esta página simula pagamentos para teste</p>
              <p>Valor simulado: R$ 30,00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
