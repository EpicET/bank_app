package com.app.bank.model;

public class Transaction {
    private String type;
    private float amount;

    public Transaction(String type, float amount) {
        this.type = type;
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public float getAmount() {
        return amount;
    }

    @Override
    public String toString() {
        return type + " " + amount;
    }
}
