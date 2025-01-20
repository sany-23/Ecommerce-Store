import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_page.dart';

class CheckoutPage extends StatefulWidget {
  const CheckoutPage({Key? key}) : super(key: key);

  @override
  State<CheckoutPage> createState() => _CheckoutPageState();
}

class _CheckoutPageState extends State<CheckoutPage> {
  Map<String, dynamic> _cart = {'items': []};
  double _totalPrice = 0.0;
  double _discount = 0.0;
  String _promoCode = '';
  String _selectedPaymentMethod = 'creditCard';

  // Payment method fields
  final _cardNumberController = TextEditingController();
  final _expiryDateController = TextEditingController();
  final _cvvController = TextEditingController();

  final _accountNumberController = TextEditingController();
  final _bankNameController = TextEditingController();
  final _ifscController = TextEditingController();

  // Contact info
  final _contactNumberController = TextEditingController();
  final _deliveryAddressController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadCart();
  }

  Future<void> _loadCart() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('userId') ?? 0;

    final response =
        await http.get(Uri.parse('http://localhost:8080/carts/user/$userId'));
    if (response.statusCode == 200) {
      setState(() {
        _cart = json.decode(response.body);
        _calculateTotalPrice();
      });
    }
  }

  void _calculateTotalPrice() {
    final items = _cart['items'] as List;
    double baseTotal = 0.0;
    for (var item in items) {
      final price = item['product']['price'] as double;
      final qty = item['quantity'] as int;
      baseTotal += price * qty;
    }
    setState(() {
      _totalPrice = baseTotal - (baseTotal * _discount);
    });
  }

  Future<void> _applyPromoCode() async {
    if (_promoCode.isEmpty) return;
    final response = await http.get(
      Uri.parse('http://localhost:8080/promo-codes/$_promoCode'),
    );
    if (response.statusCode == 200) {
      final discountValue =
          double.tryParse(response.body) ?? 0.0; // 0.10 => 10%
      setState(() {
        _discount = discountValue;
      });
      // Optionally update each item's discount
      final items = _cart['items'] as List;
      for (var item in items) {
        final baseSubtotal =
            (item['product']['price'] as double) * (item['quantity'] as int);
        item['discountPercentage'] = discountValue;
        item['discountAmount'] = baseSubtotal * discountValue;
      }
      _calculateTotalPrice();
    }
  }

  Future<void> _confirmOrder() async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('userId') ?? 0;

    final items = (_cart['items'] as List).map((item) {
      return {
        'product': {'id': item['product']['id']},
        'quantity': item['quantity'],
        'discountPercentage': item['discountPercentage'] ?? 0.0,
        'discountAmount': item['discountAmount'] ?? 0.0,
      };
    }).toList();

    final order = {
      'user': {'id': userId},
      'items': items,
      'totalPrice': _totalPrice,
      'paymentMethod': _selectedPaymentMethod,
      'paymentStatus': 'paid',
      'creditCardInfo': _selectedPaymentMethod == 'creditCard'
          ? {
              'cardNumber': _cardNumberController.text,
              'expiryDate': _expiryDateController.text,
              'cvv': _cvvController.text,
            }
          : null,
      'bankTransferInfo': _selectedPaymentMethod == 'bankTransfer'
          ? {
              'accountNumber': _accountNumberController.text,
              'bankName': _bankNameController.text,
              'ifscCode': _ifscController.text,
            }
          : null,
      'contactNumber': _contactNumberController.text,
      'deliveryAddress': _deliveryAddressController.text,
    };

    // Post the order to the backend
    final response = await http.post(
      Uri.parse('http://localhost:8080/orders'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(order),
    );

    if (response.statusCode == 200) {
      // Show success dialog
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Order Successful'),
          content: const Text('Your order has been placed successfully!'),
          actions: [
            TextButton(
              onPressed: () async {
                Navigator.of(context).pop();

                // Clear the cart
                await http.delete(
                  Uri.parse('http://localhost:8080/carts/user/$userId/items'),
                );

                // Send order details to admin
                await http.post(
                  Uri.parse('http://localhost:8080/admin/orders'),
                  headers: {'Content-Type': 'application/json'},
                  body: json.encode(order),
                );

                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(
                      builder: (context) => HomePage(userId: userId)),
                  (route) => false,
                );
              },
              child: const Text('OK'),
            ),
          ],
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to place order.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final items = _cart['items'] as List;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Checkout'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blue.shade800, Colors.blue.shade300],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        const Text(
                          'Invoice',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        // List of items
                        ListView.builder(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: items.length,
                          itemBuilder: (context, index) {
                            final item = items[index];
                            final product = item['product'];
                            final quantity = item['quantity'] as int;
                            final price = product['price'] as double;
                            final discountAmount =
                                (item['discountAmount'] ?? 0.0) as double;
                            final subtotal = price * quantity - discountAmount;
                            return ListTile(
                              leading: ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: Image.network(
                                  'http://localhost:8080/images/${product["imageUrl"]}',
                                  width: 50,
                                  height: 50,
                                  fit: BoxFit.cover,
                                ),
                              ),
                              title: Text(
                                product['name'],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              subtitle: Text(
                                'Qty: $quantity | Price: \$${price.toStringAsFixed(2)}',
                              ),
                              trailing: Text(
                                'Subtotal: \$${subtotal.toStringAsFixed(2)}',
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold),
                              ),
                            );
                          },
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Total: \$${_totalPrice.toStringAsFixed(2)}',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                        const SizedBox(height: 16),
                        // Promo code
                        TextField(
                          decoration: const InputDecoration(
                            labelText: 'Promo Code',
                            border: OutlineInputBorder(),
                          ),
                          onChanged: (value) => _promoCode = value,
                        ),
                        const SizedBox(height: 8),
                        ElevatedButton(
                          onPressed: _applyPromoCode,
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 24, vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text('Apply Code'),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // Payment Card
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        const Text(
                          'Payment Method',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        DropdownButton<String>(
                          value: _selectedPaymentMethod,
                          items: const [
                            DropdownMenuItem(
                              value: 'creditCard',
                              child: Text('Credit Card'),
                            ),
                            DropdownMenuItem(
                              value: 'bankTransfer',
                              child: Text('Bank Transfer'),
                            ),
                            DropdownMenuItem(
                              value: 'cashOnDelivery',
                              child: Text('Cash on Delivery'),
                            ),
                          ],
                          onChanged: (value) {
                            setState(() => _selectedPaymentMethod = value!);
                          },
                        ),
                        const SizedBox(height: 16),
                        if (_selectedPaymentMethod == 'creditCard') ...[
                          TextField(
                            controller: _cardNumberController,
                            decoration: const InputDecoration(
                              labelText: 'Card Number',
                              border: OutlineInputBorder(),
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextField(
                            controller: _expiryDateController,
                            decoration: const InputDecoration(
                              labelText: 'Expiry Date (MM/YY)',
                              border: OutlineInputBorder(),
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextField(
                            controller: _cvvController,
                            decoration: const InputDecoration(
                              labelText: 'CVV',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ] else if (_selectedPaymentMethod ==
                            'bankTransfer') ...[
                          TextField(
                            controller: _accountNumberController,
                            decoration: const InputDecoration(
                              labelText: 'Account Number',
                              border: OutlineInputBorder(),
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextField(
                            controller: _bankNameController,
                            decoration: const InputDecoration(
                              labelText: 'Bank Name',
                              border: OutlineInputBorder(),
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextField(
                            controller: _ifscController,
                            decoration: const InputDecoration(
                              labelText: 'IFSC Code',
                              border: OutlineInputBorder(),
                            ),
                          ),
                        ] else ...[
                          const Text(
                            'Cash on Delivery selected. Please have the exact amount ready.',
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // Contact info card
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        const Text(
                          'Contact Information',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: _contactNumberController,
                          decoration: const InputDecoration(
                            labelText: 'Contact Number',
                            border: OutlineInputBorder(),
                          ),
                        ),
                        const SizedBox(height: 8),
                        TextField(
                          controller: _deliveryAddressController,
                          decoration: const InputDecoration(
                            labelText: 'Delivery Address',
                            border: OutlineInputBorder(),
                          ),
                          maxLines: 3,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _confirmOrder,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 24, vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Confirm Order',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _cardNumberController.dispose();
    _expiryDateController.dispose();
    _cvvController.dispose();
    _accountNumberController.dispose();
    _bankNameController.dispose();
    _ifscController.dispose();
    _contactNumberController.dispose();
    _deliveryAddressController.dispose();
    super.dispose();
  }
}
