package com.aps.menu.cadastros;

import com.aps.menu.entidades.Restaurante;
import com.aps.menu.entidades.Conta;

public interface IRepositorioRestaurante {

    public Restaurante registrar(Restaurante restaurante);

    public boolean existe(Conta conta);
    
}
