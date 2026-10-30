# 3D Model Assets Directory

Place your custom 3D GLB/GLTF luxury watch models in this directory.

### Supported File:
- `public/models/watch.glb` (default loaded if present)
- Or custom watch models named after slugs: `public/models/{slug}.glb`

### Recommended Model Specifications:
1. **Format**: Binary GLTF (`.glb`)
2. **Polygon Count**: 30,000 - 80,000 triangles for optimal real-time browser performance
3. **Materials**: PBR standard materials (Metalness/Roughness workflow)
4. **Textures**: 1K or 2K WebP/PNG textures (Albedo, Normal, Roughness, Metalness)
5. **Scale**: Centered at origin (0, 0, 0), normalized diameter ~1.5 to 2.0 Three.js world units
6. **Hierarchy Naming for Customizer Integration**:
   - `Case` or `Watch_Case` -> updates case material (Stainless Steel, DLC Black, 18k Gold)
   - `Dial` or `Watch_Dial` -> updates dial color & finish (Onyx Black, Sunburst Silver, Royal Navy, Emerald)
   - `Strap` or `Watch_Strap` -> updates strap material & color (Alligator Leather, Steel Bracelet, Rubber)
   - `Hands` -> hour, minute, second hands
   - `Glass` -> sapphire crystal mesh with transmission & roughness

### Procedural Fallback:
If no `watch.glb` file is found, CHRONO automatically renders a high-fidelity procedural 3D timepiece with multi-layer dial, fluted bezel, functioning sub-dials, sapphire crystal, and exhibition caseback.
