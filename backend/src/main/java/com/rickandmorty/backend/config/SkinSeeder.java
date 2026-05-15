package com.rickandmorty.backend.config;

import com.rickandmorty.backend.model.Skin;
import com.rickandmorty.backend.repository.SkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import java.util.Base64;

@Component
@Order(1)
@RequiredArgsConstructor
public class SkinSeeder implements CommandLineRunner {

    private final SkinRepository repository;

    @Override
    public void run(String... args) throws Exception {
        seedSkin("croc-x",        "General Croc-X",           "skins/croc-x.jpeg");
        seedSkin("mantegao",      "Sr. Mantegão Supremo",     "skins/mantegao.jpeg");
        seedSkin("pixel-kid",     "Pixel Kid",                "skins/pixel-kid.jpeg");
        seedSkin("omega-milk",    "Omega Milk",               "skins/omega-milk.jpeg");
        seedSkin("bibliotecario", "Bibliotecário do Vazio",   "skins/bibliotecario.jpeg");
        System.out.println("Skins carregadas no banco!");
    }

    private void seedSkin(String skinId, String label, String resourcePath) throws Exception {
        if (repository.existsBySkinId(skinId)) return;

        ClassPathResource resource = new ClassPathResource(resourcePath);
        byte[] bytes = resource.getInputStream().readAllBytes();
        String base64 = Base64.getEncoder().encodeToString(bytes);

        String ext = resourcePath.substring(resourcePath.lastIndexOf('.') + 1).toLowerCase();
        String mime = ext.equals("jpg") || ext.equals("jpeg") ? "image/jpeg" : "image/png";
        String imageData = "data:" + mime + ";base64," + base64;

        repository.save(Skin.builder()
                .skinId(skinId)
                .label(label)
                .imageData(imageData)
                .build());
    }
}