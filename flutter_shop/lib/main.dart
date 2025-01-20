// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_shop/login-reg/login_page.dart';
import 'package:flutter_shop/login-reg/registration_page.dart';
import 'package:flutter_shop/pages/cart_page.dart';
import 'package:flutter_shop/pages/home_page.dart';
import 'package:flutter_shop/pages/my_orders.dart';
import 'package:flutter_shop/pages/profile_edit_page.dart';
import 'package:flutter_shop/pages/profile_page.dart';
import 'package:flutter_shop/pages/search_page.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Shop',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const LoginPage(),
      routes: {
        '/login': (context) => const LoginPage(),
        '/register': (context) => const RegistrationPage(),
        '/home': (context) => const HomePage(userId: 0), // Placeholder
        '/cart': (context) => const CartPage(),
        '/profile': (context) => const ProfilePage(userId: 0), // Placeholder
        '/search': (context) => const SearchPage(),
        '/edit-profile': (context) =>
            const ProfileEditPage(userId: 0), // Placeholder
        '/my-orders': (context) => const MyOrdersPage(), // Add the new route
      },
    );
  }
}
