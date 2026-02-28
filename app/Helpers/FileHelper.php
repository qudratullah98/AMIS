<?php

namespace App\Helpers;


class FileHelper
{
     
    public static function storeFile($file, string $folder): ?string
    {
        if (!$file) {
            return null;
        }

        // Create date-based path (e.g., storage/app/uploads/2024/02/23)
        $datePath = now()->format('Y/m/d');

        // Store file in storage/app/uploads/{folder}/YYYY/MM/DD/
        return $file->store("uploads/{$folder}/{$datePath}", 'public');
    }
}
