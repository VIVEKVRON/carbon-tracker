package com.example.carbontracker;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Database is not available in test phase")
class CarbonTrackerApplicationTests {

	@Test
	void contextLoads() {
	}

}
