import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

import '../models/category.dart'; // [Category](lib/models/category.dart)
import '../services/category_service.dart'; // [CategoryService](lib/services/category_service.dart)

class HomeContent extends StatefulWidget {
  const HomeContent({super.key});

  @override
  State<HomeContent> createState() => _HomeContentState();
}

class _HomeContentState extends State<HomeContent> {
  final CategoryService _categoryService = CategoryService();
  late Future<List<Category>> _futureCategories;

  final List<String> bannerImages = [
    'https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/002/292/582/small_2x/elegant-black-and-gold-banner-background-free-vector.jpg',
    'https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg',
  ];

  @override
  void initState() {
    super.initState();
    _futureCategories = _categoryService.getCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Carousel Banner
        CarouselSlider(
          options: CarouselOptions(
            height: 200.0,
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 3),
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            autoPlayCurve: Curves.fastOutSlowIn,
            enlargeCenterPage: true,
            enlargeFactor: 0.3,
            viewportFraction: 0.8,
          ),
          items: bannerImages.map((imageUrl) {
            return Builder(
              builder: (BuildContext context) {
                return Container(
                  margin: const EdgeInsets.symmetric(horizontal: 5.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8.0),
                    color: Colors.grey[300],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(8.0),
                    child: Image.network(imageUrl, fit: BoxFit.cover),
                  ),
                );
              },
            );
          }).toList(),
        ),

        const SizedBox(height: 20),

        // Categories Row
        FutureBuilder<List<Category>>(
          future: _futureCategories,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const SizedBox(
                height: 100,
                child: Center(child: CircularProgressIndicator()),
              );
            } else if (snapshot.hasError) {
              return SizedBox(
                height: 100,
                child: Center(
                  child: Text('Error: ${snapshot.error}'),
                ),
              );
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const SizedBox(
                height: 100,
                child: Center(child: Text('No categories found.')),
              );
            }

            final categories = snapshot.data!;
            return SizedBox(
              height: 150,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: categories.length,
                itemBuilder: (context, index) {
                  final category = categories[index];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: Column(
                      children: [
                        InkWell(
                          onTap: () {
                            // Handle category selection
                            debugPrint('Selected category: ${category.name}');
                          },
                          child: Container(
                            width: 100,
                            height: 100,
                            decoration: const BoxDecoration(
                              color: Color.fromARGB(0, 187, 222, 251),
                              shape: BoxShape.circle,
                            ),
                            child: ClipOval(
                              child: Image.asset(
                                'assets/images/category_icons/${_slugify(category.name)}.png',
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 4),
                        SizedBox(
                          width: 70,
                          child: Text(
                            category.name,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            );
          },
        ),

        // Featured products placeholder
        const Expanded(
          child: Center(
            child: Text('Featured Products Coming Soon!'),
          ),
        ),
      ],
    );
  }

  // Convert category name to a lowercase safe string for the icon file, e.g. "Power Supply" -> "power_supply"
  String _slugify(String text) {
    return text.toLowerCase().replaceAll(' ', '_');
  }
}
