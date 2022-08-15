package com.aps.menu.controllers;

import java.util.concurrent.atomic.AtomicLong;

import com.aps.menu.entidades.Cliente;
import com.aps.menu.entidades.Conta;
//import com.aps.menu.controladores.Fachada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TelaCadastroControle  {

    @Autowired
    //private Fachada fachada;
    //private static final AtomicLong idCounter = new AtomicLong();

    @GetMapping("/cadastro")
    public String getClientes(Model model) {
        return "telaCadastro";
    }
    /*
    @GetMapping("/cliente/inserir/")
    public String novoCliente(@RequestParam(name = "nome") String nome){
        Conta conta = new Conta(idCounter.get(), String.valueOf(idCounter.get()));
        fachada.inserirConta(conta);
        Cliente cliente = new Cliente(idCounter.getAndIncrement(), nome, conta);
        fachada.inserirCliente(cliente);
        return "redirect:/cliente";
    }
    */

}